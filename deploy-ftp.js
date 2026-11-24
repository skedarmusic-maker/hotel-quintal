import * as ftp from "basic-ftp";

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  console.log("Iniciando conexão FTP com o novo usuário do domínio oficial...");

  try {
    await client.access({
      host: "147.93.14.87",
      user: "u786839041.hotelquintaldosanimais.com.br",
      password: "1q2w3e4r!!!SK",
      port: 21,
      secure: false
    });

    console.log("✓ Conexão FTP estabelecida com sucesso!");

    // Upload dos arquivos da pasta local 'dist' para a raiz do servidor FTP ('.')
    console.log("Enviando conteúdo atualizado de 'dist/' diretamente para a raiz do site ('.')...");
    await client.uploadFromDir("dist", ".");

    console.log("🎉 DEPLOY CONCLUÍDO COM SUCESSO NO DOMÍNIO OFICIAL!");

    const listAfter = await client.list();
    console.log("Conteúdo final na raiz do servidor:", listAfter.map(f => f.name));

  } catch (err) {
    console.error("❌ Erro durante o deploy FTP:", err);
  } finally {
    client.close();
  }
}

deploy();
