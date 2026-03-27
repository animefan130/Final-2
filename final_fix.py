import os
import shutil
import time

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"
src = os.path.join(root, "src")

def robust_copy(s_name, d_name):
    s = os.path.join(src, s_name)
    d = os.path.join(root, d_name)
    if not os.path.exists(s):
        print(f"Source {s} not found")
        return
    try:
        if os.path.isdir(s):
            if os.path.exists(d):
                shutil.rmtree(d, ignore_errors=True)
                time.sleep(0.5)
            shutil.copytree(s, d)
            print(f"Copied directory {s_name}")
        else:
            shutil.copy2(s, d)
            print(f"Copied file {s_name}")
    except Exception as e:
        print(f"Failed to copy {s_name}: {e}")

# Copy everything from src to root
for item in os.listdir(src):
    robust_copy(item, item)

# Remove the problematic root page.js
pjs = os.path.join(root, "page.js")
if os.path.exists(pjs):
    try:
        os.remove(pjs)
        print("Removed root page.js")
    except Exception as e:
        print(f"Could not remove root page.js: {e}")
