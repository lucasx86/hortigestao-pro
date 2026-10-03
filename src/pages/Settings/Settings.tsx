import {
  Building2,
  BellRing,
  Database,
  Palette,
  ShieldCheck,
  Users,
} from "lucide-react";
import Card from "../../components/ui/Card";
import PageHeader from "../../components/shared/PageHeader";

const settings = [
  {
    title: "Empresa",
    description: "Nome, documento, endereço e informações do hortifruti.",
    icon: Building2,
  },
  {
    title: "Usuários",
    description: "Controle operadores, administradores e permissões.",
    icon: Users,
  },
  {
    title: "Notificações",
    description: "Configure alertas de validade, estoque mínimo e financeiro.",
    icon: BellRing,
  },
  {
    title: "Automação",
    description: "Configure regras do FIFO e rotinas automáticas.",
    icon: Database,
  },
  {
    title: "Segurança",
    description: "Sessões, autenticação e permissões do sistema.",
    icon: ShieldCheck,
  },
  {
    title: "Aparência",
    description: "Preferências visuais e comportamento da interface.",
    icon: Palette,
  },
];

export default function Settings() {
  return (
    <>
      <PageHeader
        title="Configurações"
        description="Personalize o HortiGestão PRO conforme a operação da empresa."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {settings.map((setting) => {
          const Icon = setting.icon;

          return (
            <Card
              key={setting.title}
              className="cursor-pointer p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Icon size={20} />
              </div>

              <h2 className="mt-5 font-black text-slate-900">
                {setting.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {setting.description}
              </p>
            </Card>
          );
        })}
      </div>
    </>
  );
}
