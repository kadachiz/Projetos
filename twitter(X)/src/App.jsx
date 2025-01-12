import { Sidebar } from "./components/Sidebar"
import { TwitterForm } from "./components/TwitterForm"
import { Tweet } from "./components/Tweet"
import { v4 } from "uuid"
import { getAvatar, getRandomImage } from "./Utils/generateImages"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { TrendItem } from "./components/TrendItem"
import { FollowItem } from "./components/FollowItem"


function App() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      addNewRandomTweets()
    }, 5000);
    return () => clearInterval(interval)
  }, [])

  const addNewRandomTweets = () => {
    const randomTweets = [
      'Finalmente encontrei a melhor receita de café gelado! Alguém mais é viciado em café? ☕',
      'Acabei de terminar aquela série que todos estavam falando... Preciso de recomendações novas!',
      'Dia de treino pesado! Quem mais aqui está tentando bater suas metas fitness? 💪',
      'Depois de horas tentando, finalmente resolvi aquele bug no código! A sensação é inigualável.',
      'Aquela sensação quando você reencontra amigos que não via há anos. Tão bom! ❤️',
      'Estou planejando uma viagem para o próximo mês. Alguma recomendação de destino incrível?',
      'Alguém viu a lua cheia ontem à noite? Foi simplesmente deslumbrante.',
      'Nada como ouvir música clássica enquanto trabalho. Alguém tem uma playlist para sugerir? ',
    ]
    const randomTweet = randomTweets[Math.floor(Math.random() * randomTweets.length)]

    addNewTweet(randomTweet, Math.random() > 0.7)
  }


  

  const addNewTweet = (content, includeImage = false) => {
    const newTweet = {
      id: v4(),
      name: "User",
      username: `user${Math.floor(Math.random() * 1000)}`,
      avatar: getAvatar(`user${Math.floor(Math.random() * 1000)}@email.com`),
      content,
      time: new Date().toLocaleString([], {
      hour: '2-digit',
        minute: '2-digit'
      }),
      image: includeImage ? getRandomImage() : null,
      likes: 0,
      retweets: 0,
      comments: 0
    } 
    setTweets((prevTweets) => [newTweet, ...prevTweets])
  }

  return (

    <div className="flex mx-auto max-w-7xl">
      <Sidebar />
      <main className="flex-grow border-l border-r border-gray-700 max-w-xl">
        <header className="styck top-0 z-10 bg-twitter-background bg-opacity-80 backdrop-blur-sm">
          <h2 className="px-4 py-3 text-xl font-bold">Para Você</h2>
        </header>
        <TwitterForm onTweet={(content) => addNewTweet(content, Math.random() > 0.6)}/>
        <div>
          {tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
          ))}       
        </div>
      </main>
      <aside className="top-0 auto hidden xl:block w-80 px-4">
        <div className="sticky top-0 pt-2">
          <div className="relative">
            <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3 text-gray-500" />
            <input placeholder="Buscar" className="w-full bg-gray-800 text-white rounded-full outline-none py-2 pl-10 pr-4"/>
          </div>

          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">Assine o Premium</h2>
            <p className="text-gray-500 mb-4">Assine para desbloquear novos recursos e, se elegível, receba uma parte da receita.</p>
            <button className="bg-twitter-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">Inscrever-se</button>
          </div>
          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">O que está acontecendo</h2>
            <TrendItem category="Assunto do Momento em Brasil" name="Greve" />
            <TrendItem category="Esportes · Assunto do Momento" name="King League" tweetCount="5.102" />
            <TrendItem category="Gaming · Assunto do Momento" name="Playstation" tweetCount="24,2 mil posts"/>
            <TrendItem category="Entretenimento · Assunto do Momento" name="Alanzoka" tweetCount="1.823 posts"/>
            <TrendItem category="Gaming · Assunto do Momento" name="Stardew Valley" tweetCount="2.452 posts"/>
          </div>
          <div className="bg-gray-800 rounded-xl mt-4 p-4">
            <h2 className="font-bold text-xl mb-4">Quem seguir</h2>
            <FollowItem name="Elon Musk" username="elonmusk" />
            <FollowItem name="Bill Gates" username="Billgates" />
          </div>
        </div>
      </aside>
    </div>

  )
}

export default App
