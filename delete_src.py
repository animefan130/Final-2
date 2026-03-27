import os
import shutil

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"
src = os.path.join(root, "src")

if os.path.exists(src):
    try:
        shutil.rmtree(src)
        print("Successfully deleted src folder")
    except Exception as e:
        print(f"Error deleting src: {e}")
else:
    print("src folder not found")
