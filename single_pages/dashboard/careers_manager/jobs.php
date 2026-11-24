<?php defined('C5_EXECUTE') or die('Access Denied.');
/**
 * @var array                                                                                $params
 * @var array                                                                                $items
 * @var array                                                                                $formContent
 * @var mixed                                                                                $result
 * @var string                                                                               $pagination
 * @var \Concrete\Core\View\View                                                             $view
 * @var \Concrete\Core\Form\Service\Form                                                     $form
 * @var \Concrete\Core\Form\Service\Widget\DateTime                                          $form_date_time
 * @var \Concrete\Core\Validation\CSRF\Token|null                                            $token
 * @var \Concrete\Package\CareersManager\Controller\SinglePage\Dashboard\CareersManager\Jobs $controller
 */

if (in_array($controller->getAction(), ['details', 'add', 'save'])) {
    $view->element('dashboard/jobs/details', [
        'form' => $form,
        'token' => $token,
        'dth' => $form_date_time,
        'entity' => $entity ?? null,
        'formContent' => $formContent,
        'application_types' => $controller->getApplicationTypes(),
        'locations' => $controller->getLocations(),
        'departments' => $controller->getDepartments(),
    ], 'careers_manager');
} else {
    $view->element('dashboard/jobs/list', [
        'token' => $token,
        'params' => $params,
        'items' => $items,
        'result' => $result,
        'pagination' => $pagination,
        'hasLocations' => $controller->hasLocations(),
    ], 'careers_manager');
}
