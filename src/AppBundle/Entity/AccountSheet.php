<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\Common\Collections\ArrayCollection;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="accounts_sheets",
     *      uniqueConstraints={@ORM\UniqueConstraint(name="accountsheet_account_unique", columns={"name", "account_id"})})
     * @ORM\HasLifecycleCallbacks
     */
    class AccountSheet{
        /**
         * @ORM\Id
         * @ORM\Column(type="integer", nullable=false)
         * @ORM\GeneratedValue(strategy="IDENTITY")
         */
        protected $id;

        /**
         * @ORM\Column(type="string")
         */
        protected $name;

        /**
         * @ORM\Column(type="datetime")
         */
        protected $created_at;

        /**
         * @ORM\Column(type="datetime")
         */
        protected $updated_at;

        /**
         * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Account", inversedBy="accountSheets")
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

        public function setAccount(Account $ac){
            $this->account = $ac;
        }

        public function getName(){
            return $this->name;
        }

        public function setId($id){
            $this->id = $id;
            return $this;
        }

        public function setName($name){
            $this->name = $name;
            return $this;
        }

        /**
         * @ORM\PrePersist
         */
        public function preInsert(){
            $this->created_at = $this->updated_at = new \DateTime('now');
        }

        /** @ORM\PreUpdate */
        public function preUpdate(){
            $this->updated_at = new \DateTime('now');
        }

        public function __destruct(){}
    }
