import os
import sys
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

# Configurações do Google Drive
SERVICE_ACCOUNT_FILE = 'drive-sync-hotel-0f5b674409fb.json'
FOLDER_ID = '1fC8iGFCDA6KLFvJhuTjv8-kG2ulGMbtT'
DESTINATION_DIR = os.path.join('Public', 'Images', 'site')

SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

def sync_drive():
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"[ERRO] Arquivo de credenciais '{SERVICE_ACCOUNT_FILE}' nao encontrado!")
        sys.exit(1)

    print("[INFO] Autenticando com a Conta de Servico do Google Drive...")
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    service = build('drive', 'v3', credentials=creds)

    print(f"[INFO] Buscando arquivos na pasta do Drive (ID: {FOLDER_ID})...")
    query = f"'{FOLDER_ID}' in parents and trashed = false"
    results = service.files().list(
        q=query,
        fields="nextPageToken, files(id, name, mimeType)"
    ).execute()
    items = results.get('files', [])

    if not items:
        print("[INFO] Nenhum arquivo encontrado na pasta remota do Drive.")
        print("[DICA] Certifique-se de que a pasta no seu Drive foi compartilhada com:")
        print("   drive-sync@drive-sync-hotel.iam.gserviceaccount.com")
        return

    os.makedirs(DESTINATION_DIR, exist_ok=True)
    print(f"[OK] {len(items)} arquivo(s) encontrado(s) na pasta do Drive:\n")

    downloaded_count = 0
    for item in items:
        file_id = item['id']
        file_name = item['name']
        mime_type = item['mimeType']

        # Pular pastas filhas
        if mime_type == 'application/vnd.google-apps.folder':
            continue

        target_path = os.path.join(DESTINATION_DIR, file_name)

        print(f"  -> Processando: {file_name} ... ", end="")
        if os.path.exists(target_path):
            print("Ja existe localmente (ignorado).")
            continue

        request = service.files().get_media(fileId=file_id)
        with open(target_path, 'wb') as fh:
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while not done:
                status, done = downloader.next_chunk()

        print(f"[DOWNLOAD CONCLUIDO] -> {target_path}")
        downloaded_count += 1

    print(f"\n[SUCESSO] Sincronizacao concluida! {downloaded_count} novo(s) arquivo(s) baixado(s).")

if __name__ == '__main__':
    sync_drive()
