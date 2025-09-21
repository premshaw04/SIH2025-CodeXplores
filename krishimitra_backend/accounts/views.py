from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


# Home Page
def home_page(request):
    return render(request, "accounts/index.html")


# Sign In Page
def signin_page(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(username=email, password=password)
        if user:
            login(request, user)
            return redirect('home')  # after login go to homepage
        else:
            messages.error(request, "Invalid credentials")
    return render(request, "accounts/signin.html")  # Sign In template


# Sign Up Page
def signup_page(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        if User.objects.filter(username=email).exists():
            messages.error(request, "Email already exists")
            return redirect('signup')
        user = User.objects.create_user(username=email, email=email, password=password)
        user.first_name = name
        user.save()
        messages.success(request, "Account created successfully! Please sign in.")
        return redirect('signin')
    return render(request, "accounts/signin.html")  # Reuse the same template with toggle


# Logout
def logout_user(request):
    logout(request)
    return redirect('signin')


# Password Reset Page
def password_reset_page(request):
    if request.method == "POST":
        email = request.POST.get("email")
        # You can integrate Django's password reset logic here
        messages.success(request, f"Password reset link sent to {email} (simulation).")
        return redirect('signin')
    return render(request, "accounts/password_reset.html")  # Create this template
