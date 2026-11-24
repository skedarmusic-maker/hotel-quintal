import ftplib

user = "u786839041.hotelquintaldosanimais.com.br"
password = "1q2w3e4r!!!SK"

hosts = [
    "147.93.14.87",
    "ftp.hotelquintaldosanimais.com.br",
    "hotelquintaldosanimais.com.br"
]

print("--- Testando Conexoes com Novo Usuario ---")
for h in hosts:
    print(f"\n[Host: {h}]")
    
    # 1. Plain FTP
    try:
        ftp = ftplib.FTP(h, timeout=8)
        resp = ftp.login(user, password)
        print(f"  SUCCESS (Plain FTP)! {resp}")
        print("  Arquivos:", ftp.nlst())
        ftp.quit()
        break
    except Exception as e:
        print(f"  Plain FTP Error: {e}")

    # 2. FTPS TLS
    try:
        ftps = ftplib.FTP_TLS()
        ftps.connect(h, 21, timeout=8)
        resp = ftps.login(user, password)
        ftps.prot_p()
        print(f"  SUCCESS (FTPS TLS)! {resp}")
        print("  Arquivos:", ftps.nlst())
        ftps.quit()
        break
    except Exception as e:
        print(f"  FTPS TLS Error: {e}")
