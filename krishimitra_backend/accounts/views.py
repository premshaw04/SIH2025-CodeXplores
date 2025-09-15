from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

def home_page(request):
    return render(request, "accounts/index.html")

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
    return render(request, "accounts/signin.html")  # your frontend login page

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
    return render(request, "signin.html")  # or signup.html if separate
