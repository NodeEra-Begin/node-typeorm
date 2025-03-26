import { AppDataSource } from "./data-source";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );

    const photoRepository = AppDataSource.getRepository(Photo);
    const allPhotos = await photoRepository.find();
    console.log("All photos from the db: ", allPhotos);

    const firstPhoto = await photoRepository.findOneBy({
      id: 1,
    });
    console.log("First photo from the db: ", firstPhoto);

    const meAndBearsPhoto = await photoRepository.findOneBy({
      name: "Me and Bears",
    });
    console.log("Me and Bears photo from the db: ", meAndBearsPhoto);

    const allViewedPhotos = await photoRepository.findBy({ views: 1 });
    console.log("All viewed photos: ", allViewedPhotos);

    const allPublishedPhotos = await photoRepository.findBy({
      isPublished: true,
    });
    console.log("All published photos: ", allPublishedPhotos);

    const [photos, photosCount] = await photoRepository.findAndCount();
    console.log("All photos: ", photos);
    console.log("Photos count: ", photosCount);
  })
  .catch((error) => console.log(error));
