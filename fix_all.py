import os
import shutil
import time

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"
src_app = os.path.join(root, "src/app")
dest_app = os.path.join(root, "app")

try:
    if os.path.exists(src_app):
        # We need to move content of src/app into root app
        if not os.path.exists(dest_app):
            os.makedirs(dest_app)
            
        for item in os.listdir(src_app):
            s = os.path.join(src_app, item)
            d = os.path.join(dest_app, item)
            if os.path.isdir(s):
                if os.path.exists(d):
                    shutil.rmtree(d)
                shutil.copytree(s, d)
                print(f"Copied {item} subfolder")
            else:
                shutil.copy2(s, d)
                print(f"Copied {item} file")
                
        # Now we move other src folders to root too
        for folder in ["components", "lib", "data"]:
            sf = os.path.join(root, "src", folder)
            df = os.path.join(root, folder)
            if os.path.exists(sf):
                if os.path.exists(df):
                    shutil.rmtree(df)
                shutil.copytree(sf, df)
                print(f"Copied {folder}")
except Exception as e:
    print(f"Error: {e}")

# Try to remove problematic page.js at root
pjs = os.path.join(root, "page.js")
if os.path.exists(pjs) and not os.path.exists(os.path.join(root, "app/page.js")):
   # Only remove if app/page.js exists elsewhere? No, app/page.js should exist now.
   pass
