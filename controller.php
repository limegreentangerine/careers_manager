<?php

namespace Concrete\Package\CareersManager;

use Core;
use Route;
use Concrete\Core\Entity\Package;
use ClassKit\Package\Traits\PageTrait;
use ClassKit\Package\PackageController;
use Concrete\Core\Package\PackageService;
use Symfony\Component\HttpFoundation\JsonResponse;

class Controller extends PackageController
{
    use PageTrait;

    /**
     * The packages handle.
     * Note that this must be unique in the
     * entire concrete5 package ecosystem.
     *
     * @var string
     */
    protected $pkgHandle = 'careers_manager';

    /**
     * The packages version.
     *
     * @var string
     */
    protected $pkgVersion = '0.0.0-beta.3';

    /**
     * The minimum Concrete version compatible with the package.
     * Override this value according to the minimum required version for your package.
     *
     * @var string
     */
    protected $appVersionRequired = '9.5.0';

    /**
     * The minimum PHP version compatible with the package.
     * Override this value according to the minimum required version for your package.
     *
     * @var string
     * @var string
     */
    protected $phpVersionRequired = '8.4';

    /**
     * Package service providers to register.
     *
     * eg. 'Concrete\Package\PackageHandle\Src\Providers\PackageServiceProvider'
     *
     * @var array
     */
    protected $providers = [];

    /**
     * An array describing the package dependencies.
     * Keys are package handles.
     * Values may be:
     * - false: this package can't be installed if the other package is already installed.
     * - true: this package can't be installed of the other package is not installed
     * - a string: this package can't be installed of the other package is not installed or it's installed with an older version
     * - an array with two strings, representing the minimum and the maximum version of the other package to be installed.
     *
     * @var array
     *
     * @example [
     *     // This package can't be installed if a package with handle other_package_1 is already installed.
     *     'other_package_1' => false,
     *     // This package can't be installed if a package with handle other_package_2 is not installed.
     *     'other_package_2' => true,
     *     // This package can't be installed if a package with handle other_package_3 is not installed, or it has a version prior to 1.0
     *     'other_package_3' => '1.0',
     *     // This package can't be installed if a package with handle other_package_4 is not installed, or it has a version prior to 2.0, or it has a version after 2.9
     *     'other_package_4' => ['2.0', '2.9'],
     * ]
     */
    protected $packageDependencies = [
        'class_kit' => true,
    ];

    /**
     * Package class autoloader registrations
     * The package install helper class, included with this boilerplate,
     * is activated by default.
     *
     * @see https://goo.gl/4wyRtH
     * @var array
     */
    protected $pkgAutoloaderRegistries = [
        'src' => '\CareersManager',
    ];

    /**
     * Package tasks to register.
     *
     * eg. 'task_handle' => \PackageHandle\Command\Task\Controller\TaskHandleController::class,
     *
     * @var array
     */
    protected $tasks = [];

    public function getPackageName()
    {
        return t('Careers Manager');
    }

    public function getPackageDescription()
    {
        return t('Careers Management System');
    }

    /**
     * The packages install routine.
     */
    public function install()
    {
        $pkg = parent::install();
        if (!$pkg) {
            $pkg = Core::make(PackageService::class)->getByHandle($this->pkgHandle);
        }
        $this->installDatabase();
        $this->installOrUpgrade($pkg);
    }

    /**
     * The packages upgrade routine.
     */
    public function upgrade()
    {
        $pkg = Core::make(PackageService::class)->getByHandle($this->pkgHandle);
        parent::upgrade();
        $this->installOrUpgrade($pkg);
    }

    public function registerRoutes(): void
    {
        Route::get('/ajax/validation/location/handle', function () {
            $value = $_REQUEST['value'];
            if ($value !== '') {
                $em = app()->make(\Doctrine\ORM\EntityManagerInterface::class);
                $handle = $em->getRepository(\CareersManager\Entity\Location::class)->findOneBy([
                    'handle' => $value,
                ]);
                return new JsonResponse([ 'count' => $handle ? count($handle) : 0 ]);
            }

            return new JsonResponse([]);
        });

        Route::get('/ajax/validation/job/slug', function () {
            $value = $_REQUEST['value'];
            if ($value !== '') {
                $em = app()->make(\Doctrine\ORM\EntityManagerInterface::class);
                $handle = $em->getRepository(\CareersManager\Entity\Job::class)->findOneBy([
                    'slug' => $value,
                ]);
                return new JsonResponse([ 'count' => $handle ? count($handle) : 0 ]);
            }

            return new JsonResponse([]);
        });
    }

    public function registerEvents(): void {}

    public function installOrUpgrade(Package $pkg): void
    {
        // Add dashboard pages
        $this->addSinglePage('/dashboard/careers_manager', $pkg, t('Careers Manager'));
        $this->addSinglePage('/dashboard/careers_manager/jobs', $pkg, t('Jobs'));
        $this->addSinglePage('/dashboard/careers_manager/locations', $pkg, t('Locations'));
        $this->addSinglePage('/dashboard/careers_manager/departments', $pkg, t('Departments'));
        $this->addSinglePage('/dashboard/careers_manager/settings', $pkg, t('Settings'));
    }
}
