import subprocess
import os

cwd = r"c:/Users/hp/OneDrive/Ta\u0300i li\u00ea\u0323u/Website/railway-reservation/"
try:
    res = subprocess.run(["npx", "next", "build"], cwd=cwd, capture_output=True, text=True, timeout=60)
    print("STDOUT:", res.stdout)
    print("STDERR:", res.stderr)
except Exception as e:
    print(f"Build failed with error: {e}")
