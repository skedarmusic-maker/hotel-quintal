import ftplib

usernames = [
    "u786839041.yellow-porpoise-677785.hostingersite.com",
    "u786839041",
    "u786839041@yellow-porpoise-677785.hostingersite.com",
    "yellow-porpoise-677785.hostingersite.com"
]

password = "1q2w3e4r!!!SK"
host = "147.93.14.87"

for user in usernames:
    print(f"Testando usuario: {user}")
    try:
        ftp = ftplib.FTP(host, timeout=10)
        resp = ftp.login(user, password)
        print(f"SUCCESS com {user}: {resp}")
        print("Arquivos:", ftp.nlst())
        ftp.quit()
        break
    except Exception as e:
        print(f"FAIL com {user}: {e}")
