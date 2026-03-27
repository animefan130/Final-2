import os
import shutil

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"

# Folders I want to remove from root because they should be in src
to_remove = ["app", "components", "lib", "data", "admin", "book", "login", "signup", "my-bookings", "search"]

for it in to_remove:
    p = os.path.join(root, it)
    if os.path.exists(p) and os.path.isdir(p):
        shutil.rmtree(p)
        print(f"Removed root folder {it}")

# Files to remove from root
files_to_remove = ["page.js", "page.js.bak", "delete_script.py", "build_test.py", "fix_all.py", "fix_structure.py"]
for f in files_to_remove:
    p = os.path.join(root, f)
    if os.path.exists(p):
        os.remove(p)
        print(f"Removed root file {f}")
