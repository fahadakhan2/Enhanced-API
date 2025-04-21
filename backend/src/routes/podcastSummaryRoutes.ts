import express, { Request, Response, Router } from 'express';
import { PodcastSummary } from '../types/PodcastSummary';
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const router: Router = express.Router();

let podcastSummaries: PodcastSummary[] = [
    {
      id: 1,
      title: 'Introduction to Physics',
      textContent: `
  Physics is a branch of science concerned with the nature and properties of matter and energy. The subject matter of physics includes mechanics, heat, light and other radiation, sound, electricity, magnetism, and the structure of atoms. In the classical sense, Newtonian mechanics describes the motion of macroscopic objects and remains a foundation for most engineering applications. 
  
  Students begin by learning about motion—how objects move through space and time, including concepts like velocity, acceleration, and force. Newton's three laws of motion form a central framework. The first law, often called the law of inertia, states that an object will remain at rest or in uniform motion unless acted upon by a force. The second law quantifies force as the product of mass and acceleration (F = ma), and the third law states that every action has an equal and opposite reaction.
  
  Energy conservation is another core idea. Mechanical energy, which includes kinetic and potential energy, can be transformed from one form to another but is never destroyed. Thermodynamics explores the relationship between heat and energy, introducing laws that govern energy transfer. The second law, for instance, states that entropy in a closed system always increases.
  
  Electromagnetism covers electric fields, magnetic fields, and how they interact. Topics like Ohm’s Law, circuits, Faraday’s Law, and Maxwell’s equations show how electricity and magnetism are linked. 
  
  Physics encourages problem-solving and mathematical modeling. It’s also a gateway to more advanced concepts such as quantum mechanics and relativity, which explain behaviors at very small and very fast scales. Understanding physics is critical in fields from engineering and computer science to medicine and space exploration.
      `,
    },
    {
      id: 2,
      title: 'Advanced Mathematics',
      textContent: `
  This collection of notes covers key concepts in higher mathematics, typically encountered in undergraduate studies. It starts with **calculus**, where students learn about the behavior of functions, derivatives, and integrals. Derivatives describe how a function changes at any point and are crucial for understanding motion, optimization problems, and dynamic systems. Integrals, conversely, represent the accumulation of quantities and are widely used in area, volume, and total change calculations.
  
  **Linear algebra** introduces vectors, matrices, and linear transformations. It's foundational for computer graphics, data science, and systems of equations. Key concepts include eigenvalues and eigenvectors, which help us understand how systems behave under repeated operations.
  
  **Differential equations** model how quantities change over time and are used in physics, engineering, economics, and biology. They can be ordinary (ODEs) or partial (PDEs), depending on how many independent variables are involved. Understanding methods such as separation of variables, integrating factors, and numerical approximation techniques like Euler’s method is critical.
  
  The notes also explore **multivariable calculus**, which extends concepts like derivatives and integrals to functions of several variables. Topics like partial derivatives, gradients, double and triple integrals, and vector fields are central.
  
  Finally, **vector calculus** and **theorems like Green’s, Stokes’, and Gauss’** allow us to relate surface and volume integrals to simpler line integrals. These tools are essential in electromagnetism and fluid dynamics.
  
  Mathematics is not only abstract but also highly practical, providing tools to model and solve real-world problems.
      `,
    },
    {
      id: 3,
      title: 'History Overview',
      textContent: `
  This historical overview traces major events from the 18th century to the 20th century, helping students understand the shaping forces behind our modern world. It begins with the **Industrial Revolution**, a period of technological innovation in the late 1700s that transformed economies from agrarian to industrial. This revolution began in Britain and spread globally, introducing machines like the steam engine, mechanized textile production, and railroads, fundamentally changing labor systems and urbanization patterns.
  
  The **French Revolution** (1789) marked a major political shift, emphasizing republicanism, human rights, and the fight against absolute monarchy. Its outcomes influenced movements across Europe and laid the groundwork for modern democracy and nationalism.
  
  Moving into the **19th century**, the rise of **imperialism** saw European powers colonize large parts of Africa and Asia, extracting resources and imposing control. This led to significant resistance and laid seeds for future decolonization.
  
  The **World Wars** defined the 20th century. **World War I** (1914–1918) was triggered by alliances, nationalism, and the assassination of Archduke Franz Ferdinand. Trench warfare, new technologies, and massive casualties shaped the conflict. The Treaty of Versailles ended it but imposed harsh penalties on Germany, setting the stage for **World War II** (1939–1945). WWII involved total war, the Holocaust, the use of nuclear bombs on Hiroshima and Nagasaki, and ultimately led to the formation of the United Nations.
  
  After WWII, the **Cold War** (1947–1991) began—an ideological and geopolitical struggle between the United States and the Soviet Union. This era saw the arms race, space race, proxy wars (e.g., Korea, Vietnam), and the fall of the Berlin Wall in 1989.
  
  Other major historical shifts include the **Civil Rights Movement** in the U.S., decolonization in Africa and Asia, the rise of global institutions like the UN and World Bank, and the beginning of the digital age in the late 20th century.
  
  Studying history offers insight into power dynamics, cultural shifts, and the causes and consequences of conflict—essential for understanding the present.
      `,
    },
  ];
  

// GET - Retrieve all podcasts
router.get('/', (req: Request, res: Response): void => {
  res.json({ podcastSummaries });
});

// Create a new podcast
router.post('/', (req: Request, res: Response): void => {
  const { title, textContent } = req.body;

  if (!title || !textContent) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }

  const newPodcast: PodcastSummary = {
    id: podcastSummaries.length + 1,
    title,
    textContent,
  };

  podcastSummaries.push(newPodcast);
  res.status(201).json({ podcastSummaries });
});

// Remove a podcast by ID
router.delete('/:id', (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const initialLength = podcastSummaries.length;

  podcastSummaries = podcastSummaries.filter(
    (podcastSummary) => podcastSummary.id !== id
  );

  if (podcastSummaries.length === initialLength) {
    res.status(404).json({ error: 'Podcast not found' });
    return;
  }

  res.json({ message: 'Podcast deleted', podcastSummaries });
});

export default router;
