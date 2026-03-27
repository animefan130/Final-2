import os
import shutil

root = "."
src = "src"

folders_to_copy = ["components", "lib", "data", "app/search", "app/book", "app/login", "app/signup", "app/admin", "app/my-bookings"]

for f in folders_to_copy:
    src_path = os.path.join(src, f)
    dest_path = os.path.join(root, f)
    if os.path.exists(src_path):
        if not os.path.exists(dest_path):
            os.makedirs(dest_path)
        for item in os.listdir(src_path):
            s = os.path.join(src_path, item)
            d = os.path.join(dest_path, item)
            if os.path.isfile(s):
                try:
                    shutil.copy2(s, d)
                    print(f"Copied {s} -> {d}")
                except:
                    pass
            elif os.path.isdir(s):
                # We skip deep recursion for now to be quick, but search, etc are shallow
                pass
