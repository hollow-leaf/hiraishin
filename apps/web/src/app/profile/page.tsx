import NavBar from "@/components/navbar";
import SwitchBar from "@/components/switchBar";
import DogBar from "@/components/DogBar";
import Carousel from "@/components/Carousel";
import TokenBar from "@/components/TokenBar";

const dogInfo = [
  {
    id: "1",
    owner: "John",
    breed: "Golden Retriever",
    dogName: "Buddy",
    area: "San Jose",
    img: "/dog1.jpg",
    price: 100,
  },
  {
    id: "2",
    owner: "Jane",
    breed: "Poodle",
    dogName: "Fluffy",
    area: "San Francisco",
    img: "/dog2.jpg",
    price: 200,
  },
  {
    id: "3",
    owner: "Jack",
    breed: "Labrador",
    dogName: "Max",
    area: "Oakland",
    img: "/dog3.jpg",
    price: 150,
  },
  {
    id: "4",
    owner: "Jill",
    breed: "Husky",
    dogName: "Snow",
    area: "San Jose",
    img: "/dog4.jpg",
    price: 250,
  }
];
const myDogInfo = [
  {
    chipId: "1",
    breed: "Golden Retriever",
    dogName: "Buddy",
    img: "/dog1.jpg",
  },
  {
    chipId: "2",
    breed: "Poodle",
    dogName: "Fluffy",
    img: "/dog2.jpg",
  },
  {
    chipId: "3",
    breed: "Labrador",
    dogName: "Max",
    img: "/dog3.jpg",
  },
  {
    chipId: "4",
    breed: "Husky",
    dogName: "Snow",
    img: "/dog4.jpg",
  }
];
export default function Page() {
  return (
    <div className="bg-white">
      <NavBar />
      <Carousel missedDog={dogInfo}/>
      <TokenBar amount={100} />
      <DogBar dogs={myDogInfo} />
      <SwitchBar />
    </div>
  );
}


