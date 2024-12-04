import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Verificación Segura',
    description: 'Sistema de verificación de identidad descentralizado con múltiples niveles de seguridad.',
    icon: ShieldCheckIcon,
    bgColor: 'bg-blue-500',
  },
  {
    name: 'Recompensas Automáticas',
    description: 'Obtén tokens IDT automáticamente por verificar tu identidad y participar en el ecosistema.',
    icon: CurrencyDollarIcon,
    bgColor: 'bg-green-500',
  },
  {
    name: 'Métricas en Tiempo Real',
    description: 'Seguimiento detallado de todas tus actividades y recompensas en la plataforma.',
    icon: ChartBarIcon,
    bgColor: 'bg-purple-500',
  },
  {
    name: 'Comunidad Activa',
    description: 'Forma parte de una comunidad creciente de usuarios verificados y verificadores.',
    icon: UserGroupIcon,
    bgColor: 'bg-red-500',
  },
]

const stats = [
  { id: 1, name: 'Usuarios Verificados', value: '1,000+', prefix: '+', suffix: '' },
  { id: 2, name: 'Tokens Distribuidos', value: '500,000', prefix: '', suffix: ' IDT' },
  { id: 3, name: 'Verificadores Activos', value: '50', prefix: '+', suffix: '' },
  { id: 4, name: 'Transacciones Diarias', value: '2,000', prefix: '+', suffix: '' },
]

const testimonials = [
  {
    content: "IdentiToken ha revolucionado la forma en que gestionamos las identidades digitales. La seguridad y transparencia son excepcionales.",
    author: "María González",
    role: "Verificador Senior"
  },
  {
    content: "El sistema de recompensas hace que la participación en el ecosistema sea verdaderamente gratificante.",
    author: "Carlos Ruiz",
    role: "Usuario Verificado"
  },
  {
    content: "La facilidad de uso y la robustez técnica hacen de IdentiToken una solución única en el mercado.",
    author: "Ana Martínez",
    role: "Desarrolladora Blockchain"
  }
]

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div className="relative isolate">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="mt-24 sm:mt-32 lg:mt-16">
                  <a href="#features" className="inline-flex space-x-6">
                    <span className="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/10">
                      Últimas Novedades
                    </span>
                  </a>
                </div>
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Identidad Digital Verificada con Recompensas
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  IdentiToken revoluciona la verificación de identidad combinando la seguridad blockchain 
                  con un sistema de recompensas que incentiva la participación activa en el ecosistema.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/verify"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Comenzar Ahora
                  </Link>
                  <Link
                    to="/documentation"
                    className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-2"
                  >
                    Documentación <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 md:-mr-20 lg:-mr-36" aria-hidden="true" />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-primary-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-primary-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" aria-hidden="true" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <img
                      src="/hero-image.svg"
                      alt="IdentiToken Platform"
                      className="w-full h-auto max-w-none rounded-tl-xl bg-gray-900/5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Verificación Simplificada
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Todo lo que necesitas para gestionar tu identidad digital
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Una plataforma completa que combina seguridad, transparencia y recompensas 
              en un ecosistema descentralizado.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className={`rounded-lg ${feature.bgColor} p-2`}>
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-primary-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-primary-200">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.prefix}{stat.value}{stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-600">Testimonios</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Lo que dicen nuestros usuarios
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <div className="flex gap-x-3">
                    <div className="flex-auto">
                      <div className="text-gray-900">{testimonial.content}</div>
                      <div className="mt-6">
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isConnected && (
        <div className="relative isolate mt-32 px-6 py-32 sm:mt-40 sm:py-40 lg:px-8">
          <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comienza tu viaje en IdentiToken
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Conecta tu wallet para acceder a todas las funcionalidades y comenzar a participar en nuestro ecosistema.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/verify"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Conectar Wallet
              </Link>
              <Link
                to="/documentation"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Aprende más <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}