import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  Stack,
} from "@mui/material";

export default function TokenizacaoDemo() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");
  const [documento, setDocumento] = useState<
    { nome: string; conteudo: string } | "negado" | null
  >(null);
  const [logado, setLogado] = useState(false);

  const documentoOriginal = {
    nome: "Contrato de Prestação de Serviços - Cliente XYZ",
    conteudo:
      "Este contrato estabelece os termos de prestação de serviços entre as partes...",
  };

  const tokenSimulado = "TKN-9a8f3bfc";

  const handleLogin = () => {
    if (email && senha) {
      setLogado(true);
    }
  };

  const handleAcessarDocumento = () => {
    if (token === tokenSimulado && logado) {
      setDocumento(documentoOriginal);
    } else {
      setDocumento("negado");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
      mt={5}
    >
      <Card sx={{ width: 500 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
              Login Simulado
            </Typography>

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              disabled={logado || !email || !senha}
            >
              {logado ? "Logado" : "Entrar no sistema (simulado)"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ width: 500 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">
              Acesso a Documento Tokenizado
            </Typography>

            <TextField
              label="Token do documento"
              fullWidth
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={!logado}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleAcessarDocumento}
              disabled={!logado}
            >
              Acessar Documento
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {documento === "negado" && (
        <Card sx={{ width: 500, border: "1px solid red" }}>
          <CardContent>
            <Typography color="error" fontWeight="medium">
              Acesso negado. Token inválido ou usuário não autenticado.
            </Typography>
          </CardContent>
        </Card>
      )}

      {documento && documento !== "negado" && (
        <Card sx={{ width: 500, border: "1px solid green" }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">
              {documento.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {documento.conteudo}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}