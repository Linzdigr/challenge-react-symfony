<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\Common\Collections\Criteria;
    use Doctrine\Common\Collections\ArrayCollection;
    use AppBundle\Entity\AbstractGenericEntity;
    use JMS\Serializer\Annotation\ExclusionPolicy;
    use JMS\Serializer\Annotation\Expose;
    use JMS\Serializer\Annotation\Groups;
    use JMS\Serializer\Annotation\VirtualProperty;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="accounts_sheets",
     *      uniqueConstraints={@ORM\UniqueConstraint(name="accountsheet_account_unique", columns={"name", "account_id"})})
     * @ORM\HasLifecycleCallbacks
     */
    class AccountSheet extends AbstractGenericEntity{

        /**
         * @ORM\Column(type="string")
         */
        protected $name;

        /**
         * @ORM\ManyToOne(targetEntity="Account", inversedBy="accountSheets")
         * @var Account
         */
        protected $account;

        /**
         * @ORM\OneToMany(targetEntity="Operation", mappedBy="accountSheet")
         * @var Operation[]
         */
        protected $operations;

        public function __construct($name = null){
            $this->operations = new ArrayCollection();
            $this->name = $name;
        }
        public function getId(){
            return $this->id;
        }

        public function getName(){
            return $this->name;
        }

        public function getOperations(){
            return $this->operations;
        }

        public function setAccount(Account $ac){
            $this->account = $ac;
        }

        public function setId($id){
            $this->id = $id;
            return $this;
        }

        public function setName($name){
            $this->name = $name;
            return $this;
        }

        public function getOperationById($id) {
            $criteria = Criteria::create()->where(Criteria::expr()->eq("id", $id));

            return $this->getOperations()->matching($criteria)[0];
        }

        public function __destruct(){}
    }
