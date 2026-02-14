<?php

namespace App\Controller;

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
    public function ourStory(): Response
    {
        $memories = [
            [
                'title' => 'The First Message',
                'description' => "The day a simple message changed everything.\nSeptember 9, 2024 — the beginning of something neither of us expected,\nbut both of us were meant to find.",
                'date' => 'September 9, 2024',
            ],
            [
                'title' => 'The First Time I Saw You',
                'description' => "I don't remember the exact day.\nMaybe it was September.\nMaybe it was November.\nBut I remember the feeling.\nAnd that is what truly mattered.",
                'date' => 'September 20, 2024',
            ],
            [
                'title' => 'The Day I Came for You',
                'description' => "The day I walked into your home not just as a man in love,\nbut as a man certain.\nOctober 11, 2025 — the day our future became real.",
                'date' => 'October 11, 2025',
            ],
            [
                'title' => 'The Day We Became One',
                'description' => "February 4, 2026 —\nThe day love became written.\nNot just in our hearts,\nbut officially in this world.",
                'date' => 'February 4, 2026',
            ],
            [
                'title' => 'Our Wedding Day',
                'description' => "April 11, 2026 —\nThe day we celebrate love,\nfamily,\nand the life we chose together.",
                'date' => 'April 11, 2026',
            ],
        ];

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
