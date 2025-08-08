import { Helmet } from "react-helmet-async";

const SeoDefaults = () => (
  <Helmet>
    <title>Barber Manager</title>
    <meta name="description" content="Gestão de barbearia: estoque, vendas e relatórios." />
    <meta property="og:title" content="Barber Manager" />
    <meta property="og:description" content="Sistema de gestão de barbearia" />
    <link rel="canonical" href="/" />
  </Helmet>
);

export default SeoDefaults;
