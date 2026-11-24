import os

file_path = os.path.join('Public', 'Images', 'site', 'Vídeo de preço')

with open(file_path, 'rb') as f:
    header = f.read(32)
    print("Header Hex:", header.hex())
    print("Header Raw:", header)

# Se tiver pypdf ou pypdf2 para ler cng.pdf:
pdf_path = os.path.join('Public', 'Images', 'site', 'cng.pdf')
if os.path.exists(pdf_path):
    print("\nLendo cng.pdf...")
    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        for i, page in enumerate(reader.pages):
            print(f"--- Pagina {i+1} ---")
            print(page.extract_text())
    except Exception as e:
        print("Erro pypdf:", e)
