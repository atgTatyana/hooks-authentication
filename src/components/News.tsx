import { INews } from "../App"

interface NewsProps {
  news: INews[],
}

export const News = ({ news }: NewsProps) => {
  console.log(news);
  return (
    <div className="cards">
      {news.map((item) => (
        <div className="card" key={item.id}>
          <img src={item.image} alt="news image" width='320px' height='240' />
          <h3 style={{padding: '20px', margin: 0}}>{item.title}</h3>
          <div style={{padding: '0 20px 20px'}}>{item.content}</div>
        </div>
      ))}
    </div>
  )
}
