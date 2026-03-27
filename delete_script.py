import os
path = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/page.js"
try:
    os.remove(path)
    print("Deleted successfully")
except Exception as e:
    print(f"Error: {e}")
