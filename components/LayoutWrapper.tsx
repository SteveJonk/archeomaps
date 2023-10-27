const LayoutWrapper = ({ children }: Props) => {
  return <main>{children}</main>
}

interface Props {
  children: React.ReactNode
}

export default LayoutWrapper
