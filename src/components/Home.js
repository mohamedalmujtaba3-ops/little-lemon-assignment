import { Link } from "react-router-dom";

// Static content for the weekly specials section.
const specials = [
  {
    name: "Greek salad",
    price: "$12.99",
    description:
      "Crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
  },
  {
    name: "Bruschetta",
    price: "$7.99",
    description:
      "Grilled bread smeared with garlic and seasoned with salt and olive oil.",
  },
  {
    name: "Lemon dessert",
    price: "$6.50",
    description:
      "Traditional homemade lemon cake, made with fresh lemons and a recipe passed down through the family.",
  },
];

// Landing page: hero section with a call to action and the weekly specials.
export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <h1 id="hero-title">Little Lemon</h1>
          <p className="hero-subtitle">Chicago</p>
          <p>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <Link to="/booking" className="button">
            Reserve a table
          </Link>
        </div>
      </section>
      <section className="specials" aria-labelledby="specials-title">
        <div className="section-inner">
          <h2 id="specials-title">This week's specials</h2>
          <ul className="card-grid">
            {specials.map((item) => (
              <li key={item.name}>
                <article className="card">
                  <header>
                    <h3>{item.name}</h3>
                    <p className="price">{item.price}</p>
                  </header>
                  <p>{item.description}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
