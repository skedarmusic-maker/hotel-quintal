import os
import sys

# Forçar saída UTF-8 no Windows
sys.stdout.reconfigure(encoding='utf-8')

import easyocr

print("=== INICIANDO OCR NOS FRAMES DO VÍDEO ===")
reader = easyocr.Reader(['pt', 'en'], gpu=False, verbose=False)

frames_dir = os.path.join('Public', 'Images', 'site', 'video_frames')
if os.path.exists(frames_dir):
    for f in sorted(os.listdir(frames_dir)):
        if f.endswith('.jpg'):
            img_path = os.path.join(frames_dir, f)
            print(f"\n--- Lendo {f} ---")
            results = reader.readtext(img_path, detail=0)
            for text in results:
                print(" >", text)
