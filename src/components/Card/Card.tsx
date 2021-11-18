import { ICard } from "../../types/types"
import "./Card.css"

interface ICardProps {
	card: ICard
	chooseCard: (card: ICard) => void
	isFlipped: boolean
}

const Card = ({ card, chooseCard, isFlipped }: ICardProps) => {
	return isFlipped ? (
		<img src={card.src} alt="card front" />
	) : (
		<img src="img/CardBack.jpeg" alt="card back" onClick={() => chooseCard(card)} />
	)
}

export default Card
