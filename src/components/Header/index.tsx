import logoImg from '../../assets/logo.svg';

import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <div className="logo">
          <img src={logoImg} alt="My Finances" />
          <span>My Finances</span>
        </div>
        <button 
          type="button" 
          onClick={onOpenNewTransactionModal}
          >
          Nova transação
        </button>
      </Content>
    </Container>
  );
}