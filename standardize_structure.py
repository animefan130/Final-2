import os
import shutil

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"
src = os.path.join(root, "src")

def recreate_at_root():
    for item in ["app", "components", "lib", "data"]:
        s_dir = os.path.join(src, item)
        d_dir = os.path.join(root, item)
        if os.path.exists(s_dir):
            if os.path.exists(d_dir):
                shutil.rmtree(d_dir, ignore_errors=True)
            shutil.copytree(s_dir, d_dir)
            print(f"Copied {item} to root")
        else:
            print(f"Source {s_dir} not found")

    # Important: Remove root page.js if it exists
    pjs = os.path.join(root, "page.js")
    if os.path.exists(pjs):
        os.remove(pjs)
        print("Removed root page.js")

recreate_at_root()
