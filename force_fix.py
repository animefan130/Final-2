import os
import shutil
import time

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"

def robust_move(dirname):
    src = os.path.join(root, f"src/{dirname}")
    dest = os.path.join(root, dirname)
    if os.path.exists(src):
        if os.path.exists(dest):
            print(f"Destination {dest} exists, removing...")
            shutil.rmtree(dest, ignore_errors=True)
            time.sleep(0.5)
        try:
            shutil.move(src, dest)
            print(f"Successfully moved {src} to {dest}")
        except Exception as e:
            print(f"Error moving {src}: {e}")

folders = ["app", "components", "lib", "data"]
for f in folders:
    robust_move(f)

# Delete problematic root files
for f in ["page.js", "page.js.bak"]:
    p = os.path.join(root, f)
    if os.path.exists(p):
        try:
            os.remove(p)
            print(f"Removed {p}")
        except Exception as e:
            print(f"Could not remove {p}: {e}")

# Check if src is now empty and remove it
src_dir = os.path.join(root, "src")
if os.path.exists(src_dir) and not os.listdir(src_dir):
    os.rmdir(src_dir)
    print("Removed empty src folder")
