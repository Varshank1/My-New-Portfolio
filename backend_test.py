#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Application
Tests all portfolio endpoints for functionality and data integrity
"""

import requests
import json
from datetime import datetime
import sys

# Use the production URL from frontend/.env
BASE_URL = "https://personal-folio-3.preview.emergentagent.com/api"

def test_api_health():
    """Test basic API health check"""
    print("🔍 Testing API Health Check...")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {data}")
            if "message" in data and "Portfolio API" in data["message"]:
                print("✅ API Health Check - PASSED")
                return True
            else:
                print("❌ API Health Check - FAILED: Unexpected response format")
                return False
        else:
            print(f"❌ API Health Check - FAILED: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ API Health Check - FAILED: {str(e)}")
        return False

def test_personal_info():
    """Test personal information endpoint"""
    print("\n🔍 Testing Personal Info API...")
    try:
        response = requests.get(f"{BASE_URL}/portfolio/personal-info", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            # Validate required fields
            required_fields = ["id", "name", "surname", "title", "subtitle", "location", "email", "phone", "availability_status"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                # Validate specific data
                if data["name"] == "Varshank" and data["surname"] == "Shukla":
                    print("✅ Personal Info API - PASSED")
                    return True
                else:
                    print("❌ Personal Info API - FAILED: Incorrect personal data")
                    return False
            else:
                print(f"❌ Personal Info API - FAILED: Missing fields: {missing_fields}")
                return False
        else:
            print(f"❌ Personal Info API - FAILED: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Personal Info API - FAILED: {str(e)}")
        return False

def test_about_info():
    """Test about section endpoint"""
    print("\n🔍 Testing About Info API...")
    try:
        response = requests.get(f"{BASE_URL}/portfolio/about", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            # Validate required fields
            required_fields = ["id", "journey_description", "current_focus", "stats"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                # Validate stats structure
                stats = data.get("stats", {})
                expected_stats = ["years_experience", "projects_completed", "business_growth", "certifications"]
                
                if all(stat in stats for stat in expected_stats):
                    print("✅ About Info API - PASSED")
                    return True
                else:
                    print("❌ About Info API - FAILED: Missing expected stats")
                    return False
            else:
                print(f"❌ About Info API - FAILED: Missing fields: {missing_fields}")
                return False
        else:
            print(f"❌ About Info API - FAILED: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ About Info API - FAILED: {str(e)}")
        return False

def test_skills():
    """Test skills endpoint"""
    print("\n🔍 Testing Skills API...")
    try:
        response = requests.get(f"{BASE_URL}/portfolio/skills", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            if isinstance(data, list) and len(data) > 0:
                # Validate skill categories
                expected_categories = ["Business Leadership", "Technical Expertise", "Core Competencies"]
                actual_categories = [skill["category_name"] for skill in data if "category_name" in skill]
                
                if all(cat in actual_categories for cat in expected_categories):
                    # Validate structure of first skill category
                    first_skill = data[0]
                    required_fields = ["id", "category_name", "icon", "skills"]
                    
                    if all(field in first_skill for field in required_fields):
                        print("✅ Skills API - PASSED")
                        return True
                    else:
                        print("❌ Skills API - FAILED: Missing required fields in skill category")
                        return False
                else:
                    print("❌ Skills API - FAILED: Missing expected skill categories")
                    return False
            else:
                print("❌ Skills API - FAILED: Empty or invalid response")
                return False
        else:
            print(f"❌ Skills API - FAILED: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Skills API - FAILED: {str(e)}")
        return False

def test_experience():
    """Test experience endpoint"""
    print("\n🔍 Testing Experience API...")
    try:
        response = requests.get(f"{BASE_URL}/portfolio/experience", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            if isinstance(data, list) and len(data) > 0:
                # Validate first experience entry
                first_exp = data[0]
                required_fields = ["id", "position", "company", "location", "start_date", "end_date", "is_current", "achievements"]
                
                if all(field in first_exp for field in required_fields):
                    # Check if achievements is a list
                    if isinstance(first_exp["achievements"], list) and len(first_exp["achievements"]) > 0:
                        print("✅ Experience API - PASSED")
                        return True
                    else:
                        print("❌ Experience API - FAILED: Achievements should be a non-empty list")
                        return False
                else:
                    print(f"❌ Experience API - FAILED: Missing required fields")
                    return False
            else:
                print("❌ Experience API - FAILED: Empty or invalid response")
                return False
        else:
            print(f"❌ Experience API - FAILED: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Experience API - FAILED: {str(e)}")
        return False

def test_projects():
    """Test projects endpoint"""
    print("\n🔍 Testing Projects API...")
    try:
        response = requests.get(f"{BASE_URL}/portfolio/projects", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            if isinstance(data, list) and len(data) > 0:
                # Validate first project entry
                first_project = data[0]
                required_fields = ["id", "title", "category", "description", "technologies", "key_results", "status"]
                
                if all(field in first_project for field in required_fields):
                    # Check if technologies and key_results are lists
                    if (isinstance(first_project["technologies"], list) and 
                        isinstance(first_project["key_results"], list)):
                        print("✅ Projects API - PASSED")
                        return True
                    else:
                        print("❌ Projects API - FAILED: Technologies and key_results should be lists")
                        return False
                else:
                    print(f"❌ Projects API - FAILED: Missing required fields")
                    return False
            else:
                print("❌ Projects API - FAILED: Empty or invalid response")
                return False
        else:
            print(f"❌ Projects API - FAILED: Status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Projects API - FAILED: {str(e)}")
        return False

def test_contact_submission():
    """Test contact form submission"""
    print("\n🔍 Testing Contact Form Submission...")
    try:
        # Test data
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "I'm interested in discussing potential collaboration opportunities. Your portfolio showcases impressive business and technical skills."
        }
        
        response = requests.post(f"{BASE_URL}/portfolio/contact", 
                               json=contact_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            # Validate response structure
            required_fields = ["id", "name", "email", "subject", "message", "timestamp"]
            
            if all(field in data for field in required_fields):
                # Validate that submitted data matches response
                if (data["name"] == contact_data["name"] and 
                    data["email"] == contact_data["email"] and
                    data["subject"] == contact_data["subject"] and
                    data["message"] == contact_data["message"]):
                    print("✅ Contact Form Submission - PASSED")
                    return True, data["id"]
                else:
                    print("❌ Contact Form Submission - FAILED: Data mismatch")
                    return False, None
            else:
                print("❌ Contact Form Submission - FAILED: Missing required fields in response")
                return False, None
        else:
            print(f"❌ Contact Form Submission - FAILED: Status {response.status_code}")
            if response.text:
                print(f"Error details: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ Contact Form Submission - FAILED: {str(e)}")
        return False, None

def test_contact_messages_retrieval():
    """Test contact messages retrieval"""
    print("\n🔍 Testing Contact Messages Retrieval...")
    try:
        response = requests.get(f"{BASE_URL}/portfolio/contact/messages", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: Found {len(data)} messages")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Validate first message structure
                    first_message = data[0]
                    required_fields = ["id", "name", "email", "subject", "message", "timestamp"]
                    
                    if all(field in first_message for field in required_fields):
                        print("✅ Contact Messages Retrieval - PASSED")
                        return True
                    else:
                        print("❌ Contact Messages Retrieval - FAILED: Missing required fields")
                        return False
                else:
                    print("✅ Contact Messages Retrieval - PASSED (No messages found)")
                    return True
            else:
                print("❌ Contact Messages Retrieval - FAILED: Response should be a list")
                return False
        else:
            print(f"❌ Contact Messages Retrieval - FAILED: Status {response.status_code}")
            if response.text:
                print(f"Error details: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Contact Messages Retrieval - FAILED: {str(e)}")
        return False

def test_edge_cases():
    """Test edge cases and error handling"""
    print("\n🔍 Testing Edge Cases...")
    
    # Test invalid contact submission
    print("Testing invalid contact data...")
    try:
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "subject": "",  # Empty subject
            "message": ""  # Empty message
        }
        
        response = requests.post(f"{BASE_URL}/portfolio/contact", 
                               json=invalid_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=10)
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Invalid contact data validation - PASSED")
            return True
        else:
            print(f"❌ Invalid contact data validation - FAILED: Expected 422, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Edge case testing - FAILED: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting Portfolio Backend API Tests")
    print(f"Testing against: {BASE_URL}")
    print("=" * 60)
    
    test_results = []
    
    # Run all tests
    test_results.append(("API Health Check", test_api_health()))
    test_results.append(("Personal Info API", test_personal_info()))
    test_results.append(("About Info API", test_about_info()))
    test_results.append(("Skills API", test_skills()))
    test_results.append(("Experience API", test_experience()))
    test_results.append(("Projects API", test_projects()))
    
    # Test contact form
    contact_success, message_id = test_contact_submission()
    test_results.append(("Contact Form Submission", contact_success))
    
    # Test message retrieval
    test_results.append(("Contact Messages Retrieval", test_contact_messages_retrieval()))
    
    # Test edge cases
    test_results.append(("Edge Cases", test_edge_cases()))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal Tests: {len(test_results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print(f"Success Rate: {(passed/len(test_results)*100):.1f}%")
    
    if failed == 0:
        print("\n🎉 All tests passed! Portfolio backend is working correctly.")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)