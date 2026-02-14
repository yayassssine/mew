<?php

namespace App\Repository;

use App\Entity\Memory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Memory>
 */
class MemoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Memory::class);
    }

    /**
     * @return Memory[] Returns an array of Memory objects sorted by date ascending
     */
    public function findAllSortedByDate(): array
    {
        return $this->createQueryBuilder('m')
            ->orderBy('m.date', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
