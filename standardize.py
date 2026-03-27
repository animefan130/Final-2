import os
import shutil

# Use relative paths to avoid encoding issues
root = "." 
src = "src"

def standardize():
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

    # Clear root page.js
    pjs = os.path.join(root, "page.js")
    if os.path.exists(pjs):
        try:
            os.remove(pjs)
            print("Removed root page.js")
        except:
            pass

standardize()
