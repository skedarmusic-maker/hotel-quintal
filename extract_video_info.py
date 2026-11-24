import os
import cv2
import pypdf

# 1. Tentar ler cng.pdf
pdf_path = os.path.join('Public', 'Images', 'site', 'cng.pdf')
if os.path.exists(pdf_path):
    print("=== LENDO CNG.PDF ===")
    try:
        reader = pypdf.PdfReader(pdf_path)
        for i, page in enumerate(reader.pages):
            print(f"--- Pagina {i+1} ---")
            print(page.extract_text())
    except Exception as e:
        print("Erro lendo PDF:", e)

# 2. Extrair frames do video 'Vídeo de preço'
video_path = os.path.join('Public', 'Images', 'site', 'Vídeo de preço')
if os.path.exists(video_path):
    print("\n=== EXTRAINDO FRAMES DO VÍDEO ===")
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = total_frames / fps if fps > 0 else 0
    print(f"FPS: {fps}, Total Frames: {total_frames}, Duração: {duration:.2f}s")

    output_dir = os.path.join('Public', 'Images', 'site', 'video_frames')
    os.makedirs(output_dir, exist_ok=True)

    # Extrair 1 frame a cada 1 segundo
    frame_interval = int(fps) if fps > 0 else 30
    count = 0
    saved = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if count % frame_interval == 0:
            frame_name = os.path.join(output_dir, f"frame_{saved:02d}.jpg")
            cv2.imwrite(frame_name, frame)
            saved += 1
        count += 1
    cap.release()
    print(f"✓ {saved} frames salvos na pasta {output_dir}")
