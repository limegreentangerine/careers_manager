<?php

namespace CareersManager\Search\ItemList\Job;

use DateTime;
use CareersManager\Entity\Job;
use ClassKit\Search\ItemList\ListTrait;
use Pagerfanta\Doctrine\DBAL\QueryAdapter;
use Concrete\Core\Search\Pagination\Pagination;
use Concrete\Core\Application\ApplicationAwareTrait;
use Concrete\Core\Search\ItemList\Database\ItemList;
use Concrete\Core\Application\ApplicationAwareInterface;

class Jobs extends ItemList implements ApplicationAwareInterface
{
    use ListTrait;
    use ApplicationAwareTrait;

    protected $autoSortColumns = [
        'j.id',
        'j.title',
    ];

    protected function createPaginationObject()
    {
        $adapter = new QueryAdapter(
            $this->deliverQueryObject(),
            function (\Doctrine\DBAL\Query\QueryBuilder $query) {
                $query
                    ->resetQueryParts(['groupBy', 'orderBy'])
                    ->select('count(distinct j.id)')
                    ->setMaxResults(1);
            },
        );
        $pagination = new Pagination($this, $adapter);

        return $pagination;
    }

    public function createQuery()
    {
        $this->query->select('j.id')
            ->from('crsJobs', 'j')
        ;
    }

    /**
     * @param int    $department
     * @param string $comparison
     */
    public function filterByDepartment(int $department, string $comparison = '=')
    {
        $this->filterBy('departmentId', $department, $comparison);
    }

    /**
     * Active jobs whose closing date hasn't passed (a job is still open on its closing date).
     */
    public function filterByLive()
    {
        $now = new DateTime();
        $this->filterBy('isActive', 1);
        $this->filterBy('closingDate', $now->format('Y-m-d'), '>=');
    }


    public function getTotalResults()
    {
        $query = $this->deliverQueryObject();
        $query
            ->resetQueryParts(['groupBy', 'orderBy'])
            ->select('count(distinct j.id)')
            ->setMaxResults(1);
        $result = $query->execute()->fetchOne();

        return (int) $result;
    }

    /**
     * @param mixed $queryRow
     */
    public function getResult($queryRow)
    {
        return Job::getByID($queryRow['id']);
    }
}
