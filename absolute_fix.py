import os
import shutil
import time

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"
src = os.path.join(root, "src")

# Correct root app and other directories
folders = ["app", "components", "lib", "data"]

def force_delete(path):
    if os.path.isfile(path):
        try:
            os.remove(path)
        except:
            pass
    elif os.path.isdir(path):
        shutil.rmtree(path, ignore_errors=True)

try:
    if os.path.exists(src):
        # Move every subfolder of src into root if it doesn't already exist
        for item in os.listdir(src):
            s = os.path.join(src, item)
            d = os.path.join(root, item)
            if os.path.isdir(s):
                if os.path.exists(d):
                    force_delete(d)
                    time.sleep(0.5)
                shutil.copytree(s, d)
                print(f"Copied {item} to root")
                # Attempt to delete original
                shutil.rmtree(s, ignore_errors=True)
            else:
                shutil.copy2(s, d)
                print(f"Copied file {item} to root")
                os.remove(s)
        # Try to remove empty src folder
        shutil.rmtree(src, ignore_errors=True)
except Exception as e:
    print(f"Error: {e}")

# IMPORTANT: Remove problematic files from root
for f in ["page.js", "page.js.bak", "cleanup.py", "delete_script.py", "build_test.py", "fix_all.py", "fix_structure.py", "force_fix.py"]:
    fpath = os.path.join(root, f)
    if os.path.exists(fpath):
        try:
            os.remove(fpath)
            print(f"Removed root file {f}")
        except:
            pass
