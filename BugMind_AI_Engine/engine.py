import requests
import time
from google import genai
from google.genai import errors
from google.genai import types
import base64
import base64
from PIL import Image
from io import BytesIO

# Funtion to generate AI Resolution Content
def generateSol(query,img):
    client = genai.Client(api_key="AIzaSyCptb5IlzJEcxEwBEEMPZXTzFIMS9nM51Y")
    response_schema = types.Schema(
    type=types.Type.OBJECT,
    properties={
        "root_cause_analysis": types.Schema(
            type=types.Type.STRING,
            description="A detailed explanation of the core problem identified in the ticket."
        ),
        "code_fix": types.Schema(
            type=types.Type.STRING,
            description="An optional code snippet to fix the issue. If no code fix is possible or applicable, this should not be included in the response."
        )
    },
    required=["root_cause_analysis"]
)
    try:
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=[query,img],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=response_schema
    )
        )
        return response.text
    except errors.ServerError as e:
        return f"The server is currently busy or overloaded: {e}"
    except Exception as e:
        return f"An unexpected error occurred: {e}"

# Funtion to request and get ticket Content
def getContent(ticketid):
  ticketurl = f"http://localhost:8001/tickets/{ticketid}"
  try:
    time.sleep(2)
    response = requests.get(ticketurl)
    if response.status_code == 200:
      return response.json()
    else:
      return "Server Error"
  except requests.exceptions.ConnectionError as e:
    return "Could not Generate Solution"

# Function to generate image from string
def decode_base64_to_pillow(base64_string):
    """Decodes a Base64 string directly into a PIL Image object."""
    try:
        # Ensure the string doesn't contain data URL prefixes
        if ',' in base64_string:
            base64_string = base64_string.split(',')[1]
            
        # 1. Decode the Base64 string to binary data
        img_data = base64.b64decode(base64_string)
        
        # 2. Use BytesIO to read the binary data from memory as a file
        img_bytes = BytesIO(img_data)
        
        # 3. Open the image using Pillow
        img = Image.open(img_bytes)
        
        return img   
    except base64.binascii.Error as e:  
        return None
    except IOError as e:  
        return None