import { navRepo } from "../../../_helpers/nav-repo";

export default handler;

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getUsers();
    case "POST":
      return createUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getUsers() {
    const users = navRepo.getAll();
    return res.status(200).json(users);
  }

  function createUser() {
    try {
      navRepo.create(req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
