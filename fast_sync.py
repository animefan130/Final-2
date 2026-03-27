import os
import shutil

root = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"
src = os.path.join(root, "src")

def fast_sync():
    if not os.path.exists(src):
        print("Source not found")
        return
        
    for path, dirs, files in os.walk(src):
        # Calculate relative path from src
        rel_path = os.path.relpath(path, src)
        dest_dir = os.path.join(root, rel_path) if rel_path != "." else root
        
        if not os.path.exists(dest_dir):
            os.makedirs(dest_dir)
            
        for file in files:
            s_file = os.path.join(path, file)
            d_file = os.path.join(dest_dir, file)
            try:
                shutil.copy2(s_file, d_file)
            except Exception as e:
                print(f"Error copying {file}: {e}")

fast_sync()
