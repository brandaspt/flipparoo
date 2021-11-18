import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { ICard, IGridTemplate } from "./types/types"

import "./App.css"
import Card from "./components/Card/Card"

const IMGS_ARRAY: ICard[] = [
	{ src: "img/AxlRose.jpeg" },
	{ src: "img/BruceSpringsteen.jpeg" },
	{ src: "img/DavidBowie.jpeg" },
	{ src: "img/ElvisPresley.jpeg" },
	{ src: "img/FreddieMercury.jpeg" },
	{ src: "img/JimiHendrix.jpeg" },
	{ src: "img/JimMorrison.jpeg" },
	{ src: "img/MickJagger.jpeg" },
	{ src: "img/OzzyOsbourne.jpeg" },
	{ src: "img/RobertPlant.jpeg" },
	{ src: "img/StevenTyler.jpeg" },
	{ src: "img/Sting.jpeg" },
]

const App = () => {
	const [numberOfCards, setNumberOfCards] = useState<string>("label")
	const [cards, setCards] = useState<ICard[]>([])
	const [gridTemplate, setGridTemplate] = useState<IGridTemplate>({})
	const [choiceOne, setChoiceOne] = useState<null | ICard>(null)
	const [choiceTwo, setChoiceTwo] = useState<null | ICard>(null)
	const [turns, setTurns] = useState(0)

	const prepareCards = () => {
		const shuffledImgs = [...IMGS_ARRAY].sort(() => Math.random() - 0.5)
		const gameCards = shuffledImgs.slice(0, parseInt(numberOfCards) / 2)
		const gameCardsShuffled = [...gameCards, ...gameCards].sort(() => Math.random() - 0.5)
		const completeGameCards = gameCardsShuffled.map(card => ({ ...card, matched: false, id: uuidv4() }))
		setCards(completeGameCards)
	}

	const chooseCard = (card: ICard) => {
		if (choiceOne && choiceTwo) {
			setChoiceOne(null)
			setChoiceTwo(null)
		}
		if (!choiceOne) setChoiceOne(card)
		else {
			setChoiceTwo(card)
		}
	}

	const setGrid = () => {
		switch (parseInt(numberOfCards)) {
			case 12:
				setGridTemplate({ gridTemplateColumns: "repeat(4, 1fr)" })
				break
			case 16:
				setGridTemplate({ gridTemplateColumns: "repeat(4, 1fr)" })
				break
			case 20:
				setGridTemplate({ gridTemplateColumns: "repeat(5, 1fr)" })
				break
			default:
				setGridTemplate({})
		}
	}

	const startGame = () => {
		if (numberOfCards === "label") return
		prepareCards()
		setTurns(0)
		setChoiceOne(null)
		setChoiceTwo(null)
		setGrid()
	}

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setTurns(prev => prev + 1)
			if (choiceOne.src === choiceTwo.src) {
				setCards(prev =>
					prev.map(card => {
						if (card.id === choiceOne.id || card.id === choiceTwo.id) {
							return { ...card, matched: true }
						} else return card
					})
				)
			}
		}
	}, [choiceOne, choiceTwo])

	return (
		<div className="App">
			<h1>Welcome to Flipparoo!</h1>

			<div className="f-col">
				<select id="difficulty" value={numberOfCards} onChange={e => setNumberOfCards(e.target.value)}>
					<option value="label" disabled>
						Select a difficulty
					</option>
					<option value="12">Easy (12 cards)</option>
					<option value="16">Medium (16 cards)</option>
					<option value="20">Hard (20 cards)</option>
				</select>
				<button onClick={startGame}>Start Game</button>
			</div>

			<div className="card-grid" style={gridTemplate}>
				{cards.map(card => (
					<Card
						key={card.id}
						card={card}
						chooseCard={chooseCard}
						isFlipped={card.id === choiceOne?.id || card.id === choiceTwo?.id || card.matched === true}
					/>
				))}
			</div>
			{cards.length > 0 && <p>{turns} turns</p>}
		</div>
	)
}

export default App
