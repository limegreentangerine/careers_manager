<?php

namespace Concrete\Package\CareersManager\Controller\SinglePage\Dashboard;

use Concrete\Core\Page\Controller\DashboardPageController;

class CareersManager extends DashboardPageController
{
    public function view()
    {
        return $this->buildRedirect('/dashboard/careers_manager/jobs');
    }
}
