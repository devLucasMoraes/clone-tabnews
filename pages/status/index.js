import useSWR from "swr";
async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <InfoDatabase />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI);

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}
function InfoDatabase() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI);

  return isLoading ? (
    <div>Carregando...</div>
  ) : (
    <>
      <h2>Informações do banco de dados</h2>
      <div>Versão: {data.dependencies.database.version}</div>
      <div>
        Máximo de conexões: {data.dependencies.database.max_connections}
      </div>
      <div>
        Conexões abertas: {data.dependencies.database.opened_connections}
      </div>
    </>
  );
}
