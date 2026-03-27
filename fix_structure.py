import os
import shutil

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"
src = os.path.join(root, "src")

if os.path.exists(src):
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(root, item)
        if os.path.isdir(s):
            if os.path.exists(d):
                shutil.rmtree(d)
            shutil.copytree(s, d)
            print(f"Copied {item} to root")
        else:
            shutil.copy2(s, d)
            print(f"Copied file {item} to root")
else:
    print("src folder not found")

# Delete root page.js.bak or page.js if they exist
for f in ["page.js", "page.js.bak"]:
    fpath = os.path.join(root, f)
    if os.path.exists(fpath):
        os.remove(fpath)
        print(f"Removed {f}")
