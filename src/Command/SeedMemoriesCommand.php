<?php

namespace App\Command;

use App\Entity\Memory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:seed-memories',
    description: 'Seed the database with romantic memories',
)]
class SeedMemoriesCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // Skip if memories already exist (safe for Docker restarts)
        $existingCount = $this->entityManager->getRepository(Memory::class)->count([]);
        if ($existingCount > 0) {
            $io->info('Memories already exist (' . $existingCount . ' found). Skipping seed.');
            return Command::SUCCESS;
        }

        $memories = [
            [
                'title' => 'The First Message',
                'description' => "The day a simple message changed everything.\nSeptember 9, 2024 — the beginning of something neither of us expected,\nbut both of us were meant to find.",
                'date' => '2024-09-09',
            ],
            [
                'title' => 'The First Time I Saw You',
                'description' => "I don't remember the exact day.\nMaybe it was September.\nMaybe it was November.\nBut I remember the feeling.\nAnd that is what truly mattered.",
                'date' => '2024-09-20',
            ],
            [
                'title' => 'The Day I Came for You',
                'description' => "The day I walked into your home not just as a man in love,\nbut as a man certain.\nOctober 11, 2025 — the day our future became real.",
                'date' => '2025-10-11',
            ],
            [
                'title' => 'The Day We Became One',
                'description' => "February 4, 2026 —\nThe day love became written.\nNot just in our hearts,\nbut officially in this world.",
                'date' => '2026-02-04',
            ],
            [
                'title' => 'Our Wedding Day',
                'description' => "April 11, 2026 —\nThe day we celebrate love,\nfamily,\nand the life we chose together.",
                'date' => '2026-04-11',
            ],
        ];

        foreach ($memories as $data) {
            $memory = new Memory();
            $memory->setTitle($data['title']);
            $memory->setDescription($data['description']);
            $memory->setDate(new \DateTime($data['date']));
            $this->entityManager->persist($memory);
        }

        $this->entityManager->flush();

        $io->success('Romantic memories have been seeded successfully! 💕');

        return Command::SUCCESS;
    }
}
