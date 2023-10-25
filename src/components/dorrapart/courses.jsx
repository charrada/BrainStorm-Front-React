// Import the images
import computerScienceImage from "../../assets/Math.png";
import mathematicsImage from "../../assets/Art.png";
import historyImage from "../../assets/Software.png";
import chemistryImage from "../../assets/Chem.png";

const courses = [
  {
    image: computerScienceImage,
    title: "Computer Science 101",
    description: "Introduction to computer science and programming.",
  },
  {
    image: mathematicsImage,
    title: "Mathematics For Engineers",
    description: "Fundamental mathematics for engineering students.",
  },
  {
    image: historyImage,
    title: "History Of Art",
    description:
      "Exploring the history and significance of art through the ages.",
  },
  {
    image: chemistryImage,
    title: "Chemistry In Everyday Life",
    description: "Understanding the role of chemistry in daily life.",
  },
];

const Courses = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Courses</h1>
      <p>Glimps on the available courses in our platform</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {courses.map((course, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              width: "200px",
              padding: "10px",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            <img
              src={course.image}
              alt={course.title}
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
