<?php

namespace App\Controller;

use App\Repository\MemoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function home(): Response
    {
        return $this->render('pages/home.html.twig');
    }

    #[Route('/our-story', name: 'app_our_story')]
    public function ourStory(MemoryRepository $memoryRepository): Response
    {
        $memories = $memoryRepository->findAllSortedByDate();

        return $this->render('pages/our_story.html.twig', [
            'memories' => $memories,
        ]);
    }

    #[Route('/why-you', name: 'app_why_you')]
    public function whyYou(): Response
    {
        $reasons = [
            'Because you calm my storms.',
            'Because your smile feels like home.',
            'Because with you, forever sounds short.',
            'Because you make ordinary moments extraordinary.',
            'Because loving you is the easiest thing I have ever done.',
            'Because you are my today and all of my tomorrows.',
            'Because every love story is beautiful, but ours is my favorite.',
            'Because you are the answer to every prayer I have ever whispered.',
            'Because in a sea of people, my eyes will always search for you.',
        ];

        return $this->render('pages/why_you.html.twig', [
            'reasons' => $reasons,
        ]);
    }

    #[Route('/forever', name: 'app_forever')]
    public function forever(): Response
    {
        return $this->render('pages/forever.html.twig');
    }
}
