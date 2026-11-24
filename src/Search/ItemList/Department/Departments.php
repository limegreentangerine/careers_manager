<?php

namespace CareersManager\Search\ItemList\Department;

use CareersManager\Entity\Department;
use ClassKit\Search\ItemList\ListTrait;
use Pagerfanta\Doctrine\DBAL\QueryAdapter;
use Concrete\Core\Search\Pagination\Pagination;
use Concrete\Core\Application\ApplicationAwareTrait;
use Concrete\Core\Search\ItemList\Database\ItemList;
use Concrete\Core\Application\ApplicationAwareInterface;

class Departments extends ItemList implements ApplicationAwareInterface
{
    use ListTrait;
    use ApplicationAwareTrait;

    protected $autoSortColumns = [
        'd.id',
    ];

    protected function createPaginationObject()
    {
        $adapter = new QueryAdapter(
            $this->deliverQueryObject(),
            function (\Doctrine\DBAL\Query\QueryBuilder $query) {
                $query
                    ->resetQueryParts(['groupBy', 'orderBy'])
                    ->select('count(distinct d.id)')
                    ->setMaxResults(1);
            },
        );
        $pagination = new Pagination($this, $adapter);

        return $pagination;
    }

    public function createQuery()
    {
        $this->query->select('d.id')
            ->from('crsDepartments', 'd')
        ;
    }

    public function getTotalResults()
    {
        $query = $this->deliverQueryObject();
        $query
            ->resetQueryParts(['groupBy', 'orderBy'])
            ->select('count(distinct d.id)')
            ->setMaxResults(1);
        $result = $query->execute()->fetchOne();

        return (int) $result;
    }

    /**
     * @param mixed $queryRow
     */
    public function getResult($queryRow)
    {
        return Department::getByID($queryRow['id']);
    }
}
