const LayoutWrapper = ({ children }: Props) => {
  return <main className="h-screen w-screen">{children}</main>
}

interface Props {
  children: React.ReactNode
}

export default LayoutWrapper
