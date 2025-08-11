#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Animals Management System
Tests authentication, CRUD operations for all entities
"""

import requests
import json
import sys
from datetime import datetime
import uuid

class AnimalsAPITester:
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_user_id = None
        self.created_entities = {
            'owners': [],
            'pets': [],
            'wild_animals': [],
            'species': []
        }

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED {details}")
        else:
            print(f"❌ {name} - FAILED {details}")

    def make_request(self, method, endpoint, data=None, expected_status=200):
        """Make HTTP request with proper headers"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text}

            return success, response.status_code, response_data

        except Exception as e:
            return False, 0, {"error": str(e)}

    def test_health_check(self):
        """Test if API is running"""
        success, status, data = self.make_request('GET', '')
        self.log_test("Health Check", success, f"Status: {status}")
        return success

    def test_register_user(self):
        """Test user registration"""
        test_user = {
            "username": f"testuser_{datetime.now().strftime('%H%M%S')}",
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "password": "testpassword123"
        }
        
        success, status, data = self.make_request('POST', 'auth/register', test_user, 201)
        
        if success and 'user' in data and 'id' in data['user']:
            self.test_user_id = data['user']['id']
            self.test_user_email = test_user['email']
            self.test_user_password = test_user['password']
            
        self.log_test("User Registration", success, f"Status: {status}, User ID: {data.get('user', {}).get('id', 'N/A')}")
        return success

    def test_login_user(self):
        """Test user login"""
        if not hasattr(self, 'test_user_email'):
            self.log_test("User Login", False, "No test user available")
            return False
            
        login_data = {
            "email": self.test_user_email,
            "password": self.test_user_password
        }
        
        success, status, data = self.make_request('POST', 'auth/login', login_data, 200)
        
        if success and 'token' in data:
            self.token = data['token']
            
        self.log_test("User Login", success, f"Status: {status}, Token: {'✓' if self.token else '✗'}")
        return success

    def test_protected_route(self):
        """Test accessing protected route"""
        success, status, data = self.make_request('POST', 'auth/profile', expected_status=201)
        self.log_test("Protected Route Access", success, f"Status: {status}")
        return success

    def test_create_species(self):
        """Test creating species"""
        species_data = {
            "name": f"Test Species {datetime.now().strftime('%H%M%S')}",
            "description": "A test species for API testing",
            "isDomestic": True
        }
        
        success, status, data = self.make_request('POST', 'api/species', species_data, 201)
        
        if success and 'id' in data:
            self.created_entities['species'].append(data['id'])
            
        self.log_test("Create Species", success, f"Status: {status}, ID: {data.get('id', 'N/A')}")
        return success, data.get('id')

    def test_get_species(self):
        """Test getting all species"""
        success, status, data = self.make_request('GET', 'api/species', expected_status=200)
        species_count = len(data) if isinstance(data, list) else 0
        self.log_test("Get All Species", success, f"Status: {status}, Count: {species_count}")
        return success

    def test_create_owner(self):
        """Test creating owner"""
        owner_data = {
            "fullName": "Test Owner",
            "phoneNumber": "+1234567890",
            "email": f"owner_{datetime.now().strftime('%H%M%S')}@example.com",
            "address": {
                "street": "123 Test St",
                "city": "Test City",
                "state": "TS",
                "zipCode": "12345"
            }
        }
        
        success, status, data = self.make_request('POST', 'api/owners', owner_data, 201)
        
        if success and 'id' in data:
            self.created_entities['owners'].append(data['id'])
            
        self.log_test("Create Owner", success, f"Status: {status}, ID: {data.get('id', 'N/A')}")
        return success, data.get('id')

    def test_get_owners(self):
        """Test getting all owners"""
        success, status, data = self.make_request('GET', 'api/owners', expected_status=200)
        owners_count = len(data) if isinstance(data, list) else 0
        self.log_test("Get All Owners", success, f"Status: {status}, Count: {owners_count}")
        return success

    def test_create_pet(self, owner_id, species_id):
        """Test creating pet"""
        if not owner_id or not species_id:
            self.log_test("Create Pet", False, "Missing owner_id or species_id")
            return False, None
            
        pet_data = {
            "name": f"Test Pet {datetime.now().strftime('%H%M%S')}",
            "age": 3,
            "color": "Brown",
            "weight": 15.5,
            "dateOfBirth": "2021-01-15",
            "ownerId": owner_id,
            "speciesId": species_id
        }
        
        success, status, data = self.make_request('POST', 'api/pets', pet_data, 201)
        
        if success and 'id' in data:
            self.created_entities['pets'].append(data['id'])
            
        self.log_test("Create Pet", success, f"Status: {status}, ID: {data.get('id', 'N/A')}")
        return success, data.get('id')

    def test_get_pets(self):
        """Test getting all pets"""
        success, status, data = self.make_request('GET', 'api/pets', expected_status=200)
        pets_count = len(data) if isinstance(data, list) else 0
        self.log_test("Get All Pets", success, f"Status: {status}, Count: {pets_count}")
        return success

    def test_create_wild_animal(self, species_id):
        """Test creating wild animal"""
        if not species_id:
            self.log_test("Create Wild Animal", False, "Missing species_id")
            return False, None
            
        wild_animal_data = {
            "name": f"Wild Test {datetime.now().strftime('%H%M%S')}",
            "age": 5,
            "habitat": "Test Forest",
            "isEndangered": False,
            "dateFound": "2024-01-15",
            "speciesId": species_id
        }
        
        success, status, data = self.make_request('POST', 'api/wild-animals', wild_animal_data, 201)
        
        if success and 'id' in data:
            self.created_entities['wild_animals'].append(data['id'])
            
        self.log_test("Create Wild Animal", success, f"Status: {status}, ID: {data.get('id', 'N/A')}")
        return success, data.get('id')

    def test_get_wild_animals(self):
        """Test getting all wild animals"""
        success, status, data = self.make_request('GET', 'api/wild-animals', expected_status=200)
        animals_count = len(data) if isinstance(data, list) else 0
        self.log_test("Get All Wild Animals", success, f"Status: {status}, Count: {animals_count}")
        return success

    def run_all_tests(self):
        """Run comprehensive test suite"""
        print("🚀 Starting Animals Management System API Tests")
        print("=" * 60)
        
        # Basic connectivity
        if not self.test_health_check():
            print("❌ API is not accessible. Stopping tests.")
            return False
            
        # Authentication flow
        if not self.test_register_user():
            print("❌ User registration failed. Stopping tests.")
            return False
            
        if not self.test_login_user():
            print("❌ User login failed. Stopping tests.")
            return False
            
        if not self.test_protected_route():
            print("❌ Protected route access failed.")
            
        # Create entities for testing relationships
        species_success, species_id = self.test_create_species()
        owner_success, owner_id = self.test_create_owner()
        
        # Test CRUD operations
        self.test_get_species()
        self.test_get_owners()
        
        if species_success and owner_success:
            pet_success, pet_id = self.test_create_pet(owner_id, species_id)
            wild_animal_success, wild_animal_id = self.test_create_wild_animal(species_id)
            
            self.test_get_pets()
            self.test_get_wild_animals()
        
        # Print final results
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! Backend API is working correctly.")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed.")
            return False

def main():
    """Main test execution"""
    tester = AnimalsAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())